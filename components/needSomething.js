import utilStyles from "./../styles/utils.module.css";

export default function NeedSomething(){
    return (
        <div>
            <div className = {`pt-5 ${utilStyles.needSomething}`}>
                <h1>Need something done ?</h1>
                <div className="row mb-3 mt-5">
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3>Hire top developers</h3>
                        <h6>No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Free chat</h3>
                        <h6>No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Pay safely</h3>
                        <h6>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Contact Us</h3>
                        <h6>Our talented team of recruiters can help you find the best freelancer for the job and our technical co-pilots can even manage the project for you.</h6>
                    </div>
                </div>
            </div>
            <div className={utilStyles.divider}></div>
            <div className = {`pt-5 ${utilStyles.needSomething}`}>
                <h1>What's great about it ?</h1>
                <div className="row mb-3 mt-5">
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3>Browse portfolios</h3>
                        <h6>Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Free chat</h3>
                        <h6>Free sent other chanel and any source. and very fast speed.</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Quality work</h3>
                        <h6>Quality of work is guranted by high skill and deep experience of developers.</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 themed-grid-col text-center">
                        <h3><i></i>Track progress</h3>
                        <h6>Keep up-to-date and on-the-go with our time tracker, and mobile app. Always know what freelancers are up to.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}