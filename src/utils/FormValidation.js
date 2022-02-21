// SIGN UP
export const signupValidate = (user) => {
    const errors = [[], [], []]
    if(!user?.username) {
        errors[0].push("username required!")
    } else if(user.username.includes(" ")) {
        errors[0].push("username cannot include space!")
    } else if(!/^[a-z0-9_]+$/.test(user.username)) {
        errors[0].push("only lowercase letters, digits and underscores are allowed!")
    } else if(!(user.username.length >= 2 && user.username.length <= 17)) {
        errors[0].push("username must be at least 2 char and at most 17 char!")
    }
    if(!user?.email) {
        errors[1].push("email required!")
    } else {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        !re.test(user.email) && errors[1].push("check email format!")
        
    }
    if(!user?.password) {
        errors[2].push("password required!")
    } else {
        user.password.length < 6 && errors[2].push("password must be at least 6 char!")
    }
    return errors;
}

// LOG IN
export const loginValidate = (user) => {
    const errors = [[], []]
    if(!user?.username) {
        errors[0].push("username required!")
    } else if(user.username.includes(" ")) {
        errors[0].push("username cannot include space!")
    } else if(!/^[a-z0-9_]+$/.test(user.username)) {
        errors[0].push("only lowercase letters, digits and underscores are allowed!")
    } else if(!(user.username.length >= 2 && user.username.length <= 17)) {
        errors[0].push("username must be at least 2 char and at most 17 char!")
    }
    if(!user?.password) {
        errors[1].push("password required!")
    } else {
        user.password.length < 6 && errors[1].push("password must be at least 6 char!")
    }
    return errors;
}

// PUBLISH
export const publishValidate = (post) => {
    const errors = [[], []]
    if(!post?.category) {
        errors[0].push("category required!")
    } else if(!/^[a-z0-9' ']+$/.test(post.category)) {
        errors[0].push("only lowercase letters, spaces and digits are allowed!")
    }
    if(!post?.text) {
        errors[1].push("post required!")
    }
    return errors;
}

// EDIT
export const editProfileValidate = (user) => {
    const errors = [[], []]
    if(!user?.username) {
        errors[0].push("username required!")
    } else if(user.username.includes(" ")) {
        errors[0].push("username cannot include space!")
    } else if(!/^[a-z0-9_]+$/.test(user.username)) {
        errors[0].push("only lowercase letters, digits and underscores are allowed!")
    } else if(!(user.username.length >= 2 && user.username.length <= 17)) {
        errors[0].push("username must be at least 2 char and at most 17 char!")
    }
    if(!user?.email) {
        errors[1].push("email required!")
    } else {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        !re.test(user.email) && errors[1].push("check email format!")
        
    }
    return errors;
}

// SETTINGS
export const settingsValidate = (user) => {
    const errors = []
    if(!user?.password) {
        errors.push("password required!")
    } else {
        user.password.length < 6 && errors.push("password must be at least 6 char!")
    }
    return errors;
}

// COMMENT
export const commentValidate = (comment) => {
    const errors = []
    if(!comment) {
        errors.push("comment required!")
    }
    return errors;
}