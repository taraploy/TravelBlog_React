export const indexPage = (req, res, next) => {
    res.render('layout', { content: 'index', title: 'AROUND THE WORLD' })
}

export const aboutPage = (req, res, next) => {
    res.render('layout', { content: 'about', title: 'AROUND THE WORLD' })
}

export const contactPage = (req, res, next) => {
    res.render('layout', { content: 'contact', title: 'AROUND THE WORLD' })
}

export const newsPage = (req, res, next) => {
    res.render('layout', { content: 'news', title: 'AROUND THE WORLD' })
}

export const loginPage = (req, res, next) => {
    res.render('layout', { content: 'login', title: 'AROUND THE WORLD' })
}

export const registerPage = (req, res, next) => {
    res.render('layout', { content: 'register', title: 'AROUND THE WORLD' })
}
