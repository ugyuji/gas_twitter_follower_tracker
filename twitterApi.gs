function getFollowersCount(screen_name) {
  const api_endpoint = "https://api.twitter.com/1.1/users/show.json?screen_name=" + screen_name;
  const script_properties = PropertiesService.getScriptProperties();
  const token = script_properties.getProperty("TWITTER_BEARER_TOKEN");
  const request_options = {
    "method": "get",
    "headers": {
      "authorization": "Bearer " + token
    }
  }
  try {
    const response = JSON.parse(UrlFetchApp.fetch(api_endpoint, request_options));
    const followersCount = response.followers_count;
    return followersCount;
  } catch(ex) {
    Logger.log(ex);
    return ex;
  }
}

