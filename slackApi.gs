function sendNotificationToSlackChannnel(channel, text) {
  const api_endpoint = "https://slack.com/api/chat.postMessage";
  const script_properties = PropertiesService.getScriptProperties();
  const token = script_properties.getProperty("SLACK_BEARER_TOKEN");
  const request_options = {
    "method": "get",
    "payload": {
      "channel": channel,
      "text": text
    },
    "headers": {
      "authorization": "Bearer " + token
    }
  }
  const response = JSON.parse(UrlFetchApp.fetch(api_endpoint, request_options));
  return response;
}

