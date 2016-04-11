const webshot = require('webshot');

const createHtml = (code) => `
<code style="display:block;">${code}</code>
<code id="result">=> </code>
<script>
var result;
try{
  result = eval("${code}");
}catch(e){
  result = e;
}
var c = document.getElementById('result').textContent += result;
</script>
`;

module.exports = {
  contentType: 'image/png',
  codeType: 'string',
  generate(req, res, code){
    webshot(createHtml(code), {
      windowSize: {
        width: 300,
        height: 200
      },
      renderDelay: 1000,
      siteType: 'html'
    }).pipe(res);
  }
};