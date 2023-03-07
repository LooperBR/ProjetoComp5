export default async function RequestHTTP(
  requestType,
  requestUrl,
  headers = [],
  requestBody = "",
  async = true
) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open(requestType, requestUrl, async);

  if (headers) {
    if (headers.length > 0) {
      headers.forEach((value) => {
        xmlHttp.setRequestHeader(value.header, value.value);
      });
    }
  }

  xmlHttp.send(requestBody);

  return new Promise((resolve) => {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        resolve(xmlHttp);
      }
    };
  });
}
