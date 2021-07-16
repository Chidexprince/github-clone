import logo from '../asset/github-logo.png'


function LandingPage() {
    return (
        <div className="outer">
            <div className="middle">
                <div className="inner-home">
                    <div className="text-center">
                        <img src={logo} alt="github logo" width="200" height="120" />
                    </div>

                    <div className="form-group has-search">
                        <span className=" form-control-feedback">
                            <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path fill='#5c5c5c' d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" />
                            </svg>
                        </span>
                        <input type="text" className="form-control border-end-0 border rounded-pill p-4" />
                    </div>

                </div>
                <div className="inner">
                    <button className="btn btn-login px-4 py-2 mt-3">Search Github</button>
                </div>
            </div>
        </div>
    )
}


export default LandingPage;