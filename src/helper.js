export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time + ' | ' + d.toLocaleDateString()
  }

  export function formatQuestion (question, author, authedUserID) {
    const { id: qid, optionOne, optionTwo, timestamp } = question
    const { name: authorName, id: authorID, avatarURL } = author

    const optionOneVoteCount = (optionOne.votes || []).length;
    const optionTwoVoteCount = (optionTwo.votes || []).length;
    const totalVoteCount = optionOneVoteCount + optionTwoVoteCount;

    const optionOneAnswered = optionOne.votes.includes(authedUserID);
    const optionTwoAnswered = optionTwo.votes.includes(authedUserID);

    return {
      authorName,
      authorID,
      avatar: avatarURL,
      qid,
      timestamp,
      optionOneText: optionOne.text,
      optionOneVoteCount,
      optionOneVotePercentage: (optionOneVoteCount * 100) / totalVoteCount,
      optionOneAnswered,
      optionTwoText: optionTwo.text,
      optionTwoVoteCount,
      optionTwoVotePercentage: (optionTwoVoteCount * 100) / totalVoteCount,
      optionTwoAnswered,
      answered: optionOneAnswered || optionTwoAnswered,
    }
  }