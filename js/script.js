//Global variables//

//Div where profile info appears//
const overview = document.querySelector(".overview");
const username = "stephanieparra";

const gitUserInfo = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  console.log(data);
};
gitUserInfo();
