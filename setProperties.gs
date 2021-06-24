function setProperties() {
  const scriptProperties = PropertiesService.getScriptProperties();
  // scriptProperties.setProperties('TWITTER_BEARER_TOKEN', '');
  // scriptProperties.setProperties('SLACK_BEARER_TOKEN', '');
  Logger.log(ScriptProperties.getProperty('TWITTER_BEARER_TOKEN'));
  Logger.log(ScriptProperties.getProperty('SLACK_BEARER_TOKEN'));
}

