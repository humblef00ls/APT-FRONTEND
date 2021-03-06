export const config = {"setup":{"title":"CompSci 101, Fall 2021 APTs","desc":"This is the webpage for grading and submitting your APTs.","helpsection":"<p> Helpful</p>\n<p> Items</p>\n<p> Here</p>","theme":{"accent":"#012a4a","accent_d":"#fff","text":"black","text_d":"white","text_inv":"white","text_inv_d":"black","back":"#d3dceb","back_d":"#1c1c1c","section":"rgba(242,242,242,1)","section_d":"#303030","section_f":"rgba(0,0,0,0.05)","section_f_d":"rgba(255,255,255,.075)","correct":"rgba(0, 179, 0, 1)","wrong":"rgba(255, 17, 0, 1)","correct_l":"rgba(0, 179, 0, .2)","wrong_l":"rgba(255, 17, 0, .23)","progress":"rgb(255, 224, 75)"}},"apt_sections":[{"id":1,"name":"Problem Set 1","info":"APT-0, Due on Sep 2","apts":[{"name":"Intro","tags":["Required"]}]},{"id":2,"name":"Problem Set 2","info":"APT-1, Due on Sep 9","apts":[{"name":"Gravity","tags":["Lab 1","Required"]},{"name":"Bogsquare","tags":["Required"]},{"name":"Cone","tags":["Required"]},{"name":"Grayscale","tags":["Required"]},{"name":"Laundry","tags":["Lec 4","Required"]}]},{"id":3,"name":"Problem Set 3","info":"APT-2, Due on 9/28","apts":[{"name":"ReadQuizScore","tags":["Required"]},{"name":"RemoveMiddle","tags":["Split","Required"]},{"name":"PortManteau","tags":["Slice","Required"]},{"name":"TotalWeight","tags":["Required"]},{"name":"SentenceLength","tags":["Loop","Split","Count","Required"]}]},{"id":4,"name":"Problem Set 4","info":"APT-3, Due on Oct 7","apts":[{"name":"DNAcgratio","tags":["Required"]},{"name":"Pancakes","tags":["Lec 10","Required"]},{"name":"Bagels","tags":["Lec 9","Required"]},{"name":"CreateAcronym","tags":["Loop","Indexing","Challenge"]},{"name":"Emphasize","tags":["Required"]},{"name":"LastNameFirst","tags":["Required"]}]},{"id":5,"name":"Problem Set 5","info":"OPTIONAL - NOT FOR CREDIT - OLD APT QUIZ PROBLEMS - Use to practice for APT quiz 1","apts":[{"name":"BookRating","tags":[]},{"name":"SpecificWords","tags":[]},{"name":"WhichSubjects","tags":[]},{"name":"CodeBreaker","tags":[]}]},{"id":6,"name":"Problem Set 6","info":"APT-4, Due on Oct 19, Complete 5, two are required, plus three more, the others are extra","apts":[{"name":"IsSpecial","tags":[]},{"name":"MorseLikeCode","tags":["Lab 5","Parallel Lists"]},{"name":"Pikachu","tags":["While Loop"]},{"name":"Calculator","tags":[]},{"name":"Family","tags":["Lec 13","Challenge"]},{"name":"TxMsg","tags":["Lec 12","Required"]},{"name":"ScoreIt","tags":["Required"]}]},{"id":7,"name":"Problem Set 7","info":"APT-5, Due on Oct 28, Complete 5, others are extra","apts":[{"name":"CarrotBoxes","tags":["Suggested"]},{"name":"EatingGood","tags":["Lec 13"]},{"name":"SandwichBar","tags":["Lec 14"]},{"name":"BagFitter","tags":[]},{"name":"Common","tags":[]},{"name":"VenmoTracker","tags":["Lec 14"]}]},{"id":8,"name":"Problem Set 8","info":"APT-6, Due on Nov 9, Complete 5, others are extra","apts":[{"name":"BordaCount","tags":["Lab 8"]},{"name":"MemberCheck","tags":[]},{"name":"WordCompositionGame","tags":[]},{"name":"Badges","tags":["Sets"]},{"name":"SortedFreqs","tags":["Sorted Sets"]},{"name":"SortByFreqs","tags":["Sort"]},{"name":"IRVoting","tags":[]},{"name":"AnagramFree","tags":["Sort","Challenge"]}]},{"id":9,"name":"Problem Set 9","info":"APT-7, Due on Nov 19, Complete 5, two are required, plus do three more, the others are extra","apts":[{"name":"PickyEater","tags":[]},{"name":"CharityDonor","tags":["Required"]},{"name":"VoteRigging","tags":["Greedy"]},{"name":"TrophyShelf","tags":[]},{"name":"SubstringFreq","tags":[]},{"name":"Blanket","tags":["Challenge"]},{"name":"DataLinkingCount","tags":[]},{"name":"SecretCode","tags":[]},{"name":"MedalTable","tags":["Required"]}]},{"id":10,"name":"Problem Set 10","info":"OPTIONAL, Not for credit - Use to practice for APT Quiz 2. These are problems from two different APT Quizzes","apts":[{"name":"InsideCount","tags":[]},{"name":"WhichFirstNames","tags":[]},{"name":"BuyGroceries","tags":[]},{"name":"NotFirst","tags":[]},{"name":"SortCount","tags":[]},{"name":"PopularEnding","tags":[]}]},{"id":11,"name":"Problem Set 11","info":"APT-8, Due on Dec 2, Complete 5, the others are extra","apts":[{"name":"InterestingParty","tags":["Suggested"]},{"name":"EatDrink","tags":["Suggested"]},{"name":"PositiveID","tags":["Suggested","Sets"]},{"name":"TeamSplit","tags":[]},{"name":"Thesaurus","tags":["Challenge"]},{"name":"FriendScore","tags":["Challenge"]},{"name":"Pangram","tags":[]},{"name":"Moving","tags":["Challenge"]}]},{"id":12,"name":"Problem Set 12","info":"APT-9 OPTIONAL APT PROBLEMS TO PREPARE FOR EXAM","apts":[{"name":"Money","tags":[]},{"name":"Decade","tags":[]},{"name":"Consensus","tags":[]},{"name":"MaxOrder","tags":[]}]},{"id":13,"name":"Problem Set 13","info":"APT-10 OPTIONAL APT QUIZ 2 QUESTIONS","apts":[{"name":"SortWords","tags":[]},{"name":"CookieCount","tags":[]},{"name":"Midpoint","tags":[]},{"name":"LowerVowels","tags":[]}]},{"id":14,"name":"Problem Set 14","info":"APT-11 OPTIONAAL APT QUIZ 1 QUESTIONS","apts":[{"name":"BodyMassIndex","tags":[]},{"name":"StringSearch","tags":[]},{"name":"ExpenseTracker","tags":[]},{"name":"ParkingViolations","tags":[]}]}]}

import { writable, readable} from 'svelte/store';
import aptsX from "./aptsX.js";


export const submitting = writable(false);

export const lightMode = writable(undefined);

export const mainTitle = readable(config.setup.title)

export const APTXInfo = writable({
    index:-1,
    total:0,
    apts:[]
});

//let fgs = aptsX.map((??,i) => {let ?? = {} ; ??.name = ??.filename; ??.initial = ??.initial ;return ??} )




export const editorValues = writable(JSON.parse(localStorage.getItem('editorValues')) ?? aptsX.reduce( (??,??) => {??[??.filename] = ??.initial; return ??},{}) );

editorValues.subscribe((value) => localStorage.editorValues = JSON.stringify(value))

export const sliderX = writable(localStorage.getItem('sliderX') ?? 0);

sliderX.subscribe((value) => localStorage.sliderX = value)

export const url =  readable(window.location.hash, set => {
  const update = () => set(window.location.hash)
  window.addEventListener("hashchange", update)
  return () => window.removeEventListener("hashchange", update)
})