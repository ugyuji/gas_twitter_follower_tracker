function main(cron) {
  Logger.log('Execution stared.');
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const pickedItems = [];
  const failedItems = [];
  data.forEach(function(elem, index) {
    if (index !== 0 && elem[1] === cron) {
      pickedItems.push(elem);
      screenName = elem[0];
      followersCount = getFollowersCount(screenName)
      slackChannel = elem[2].replace(/<#(\S+)>/, '$1');
      mention = elem[4];
      if (!Number.isInteger(followersCount)) {
        var text = `${mention}\n\`フォロワー数のお知らせ\`\n<https://twitter.com/${screenName}|${screenName}> のフォロワー数取得中にエラーが発生しました。\n\`\`\`${followersCount}\`\`\``;
        failedItems.push(elem);
      } else {
        const now = new Date();
        const updatedAt = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
        var text = `${mention}\n\`フォロワー数のお知らせ\`\n• 取得日時: ${updatedAt}\n• アカウント: <https://twitter.com/${screenName}|${screenName}>\n• フォロワー数: ${followersCount}`;
      }
      const response = sendNotificationToSlackChannnel(slackChannel, text);
      if (!response.ok) {
        Logger.log(response);
        failedItems.push(elem);
      }
    }
  });
  if (pickedItems.length === 0) {
    Logger.log('No items found to be updated.');
  }
  if (pickedItems.length !== 0 && failedItems.length !== 0) {
    throw new Error('Some items failed.');
  }
  Logger.log('Execution succeeded.');
}
