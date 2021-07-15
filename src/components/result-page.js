import SideBar from "./tags/sidebar";
import Header from "./tags/header";


function ResultPage() {
    return (

        <div className="bg-land">
            <Header></Header>
            <div className="row mt-4">
                <div className="col-md-3"></div>
                <div className="col-md-3 mt-2">
                    <SideBar></SideBar>
                </div>
                <div className="col-md-6 mt-2">
                    <h4>result</h4>
                    <div class="card remove-border">
                        <div class="card-body">
                            This is some text within a card body.
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}



export default ResultPage;