'use strict'

// DOM Elements
const registrationForm = document.getElementById('registrationForm')
const usersContainer = document.querySelector('.users')
const fullNameInput = registrationForm['fullName']
const usernameInput = registrationForm['username']
const emailInput = registrationForm['email']
const phoneNumberInput = registrationForm['phoneNumber']
const passwordInput = registrationForm['password']
const confirmPasswordInput = registrationForm['confirmPassword']
const genderInputs = registrationForm['gender']

const users = JSON.parse(localStorage.getItem('users')) || []

const addUser = (
  fullName,
  username,
  email,
  phoneNumber,
  password,
  confirmPassword,
  gender
) => {
  users.push({
    fullName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender,
  })

  localStorage.setItem('users', JSON.stringify(users))

  return {
    fullName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender,
  }
}

const createUserElement = ({
  fullName,
  username,
  email,
  phoneNumber,
  password,
  confirmPassword,
  gender,
}) => {
  // Create elements
  const userDiv = document.createElement('div')
  userDiv.classList.add('user-card')
  const userName = document.createElement('h3')
  const userUsername = document.createElement('p')
  const userEmail = document.createElement('p')
  const userPhoneNumber = document.createElement('p')
  const userPassword = document.createElement('p')
  const userConfirmPassword = document.createElement('p')
  const userGender = document.createElement('p')

  // Fill the content
  userName.innerText = `Full Name: ${fullName}`
  userUsername.innerText = `Username: ${username}`
  userEmail.innerText = `Email: ${email}`
  userPhoneNumber.innerText = `Phone Number: ${phoneNumber}`
  userPassword.innerText = `Password: ${password}`
  userConfirmPassword.innerText = `Confirm Password: ${confirmPassword}`
  userGender.innerText = `Gender: ${gender}`

  // Add to the DOM
  userDiv.append(
    userName,
    userUsername,
    userEmail,
    userPhoneNumber,
    userPassword,
    userConfirmPassword,
    userGender
  )
  usersContainer.appendChild(userDiv)

  usersContainer.style.display = users.length === 0 ? 'none' : 'block'
}

usersContainer.style.display = users.length === 0 ? 'none' : 'block'

users.forEach(createUserElement)

registrationForm.onsubmit = e => {
  e.preventDefault()

  const newUser = addUser(
    fullNameInput.value,
    usernameInput.value,
    emailInput.value,
    phoneNumberInput.value,
    passwordInput.value,
    confirmPasswordInput.value,
    document.querySelector('input[name="gender"]:checked').value
  )

  createUserElement(newUser)

  fullNameInput.value = ''
  usernameInput.value = ''
  emailInput.value = ''
  phoneNumberInput.value = ''
  passwordInput.value = ''
  confirmPasswordInput.value = ''
  genderInputs.forEach(input => (input.checked = false))
}
