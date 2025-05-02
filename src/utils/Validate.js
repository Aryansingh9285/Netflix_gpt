export const checkValiddata = (email , password,username)=>{

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    const isUsernameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)

    if(! isEmailValid) return "Email is Not Valid"

    if(! isPasswordValid) return "Password Is not Valid"

    if(! isUsernameValid) return "Username is not Valid"

    return null
}