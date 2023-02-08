export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

  export function formatQuestion (question, author, authedUser) {
    const { id: qid, optionOne, optionTwo, timestamp } = question
    const { name: authorName, id: authorID, avatarURL } = author

    const optionOneVoteCount = (optionOne.votes || []).length;
    const optionTwoVoteCount = (optionTwo.votes || []).length;
    const totalVoteCount = optionOneVoteCount + optionTwoVoteCount;

    const optionOneAnswered = optionOne.votes.includes(authedUser);
    const optionTwoAnswered = optionTwo.votes.includes(authedUser);

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