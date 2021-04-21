export const indexPage = (req, res, next) => {
    res.render('layout', { content: 'index', title: 'Around The World' })
}

export const aboutPage = (req, res, next) => {
    res.render('layout', { content: 'about', title: 'Around The World' })
}

export const contactPage = (req, res, next) => {
    res.render('layout', { content: 'contact', title: 'Around The World' })
}

export const loginPage = (req, res, next) => {
    res.render('layout', { content: 'login', title: 'Around The World' })
}

export const registerPage = (req, res, next) => {
    res.render('layout', { content: 'register', title: 'Around The World' })
}
