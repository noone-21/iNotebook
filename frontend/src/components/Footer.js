import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="text-center text-white " >
                <div className="container pt-4">
                    <div className="mb-4">
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="https://www.facebook.com/no.one.0021"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-facebook-f"></i></a>
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="https://twitter.com/no__one_21?s=09"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-twitter"></i></a>
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="mailto:ahmed.danish800@gmail.com"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-google"></i></a>
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="https://instagram.com/no_one.__.21?igshid=1kmkme0zgmjop"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-instagram"></i>
                        </a>
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="https://www.linkedin.com/in/danish-ahmed-930111147/"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-linkedin-in"></i></a>
                        <a target='_blank' rel="noopener noreferrer"
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="https://github.com/noone-21"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
                <div className="text-center text-dark p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <a target='_blank' rel="noopener noreferrer" className="text-dark" href="/">iNotebook:</a>
                    Developed and designed by Danish Ahmed © Copyright
                </div>
            </footer>
        </div>
    )
}

export default Footer
