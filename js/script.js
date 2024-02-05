//Global variables//

//Div where profile info appears//
const overview = document.querySelector(".overview");
const username = "stephanieparra";
const repoList = document.querySelector(".repo-list");
const repoContainer = document.querySelector(".repos");
const specificRepoData = document.querySelector(".repo-data");

//Function to call API and get response//
const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  displayUserInfo(data);
};
gitUserInfo();

//Function to create new div and display the data from response//
const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(div);
  gitRepos();
};

//Function to fetch Git repos//
const gitRepos = async function () {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

//Function to display repos//
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

//Click on repos to get their data//
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//Function to get specific repo info//
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await fetchInfo.json();

  //Grab languages//
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  //Make list/array of languages//
  const languages = [];
  for (language in languageData) {
    languages.push(language);
    console.log(languages);
  }
};

const displayRepoInfo = function () {
    
}
