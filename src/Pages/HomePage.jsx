import "../features/products/ElectronicsUI";
import ElectronicsListCRUD from "../features/products/ElectronicsUI";

function HomePage(){
    return(
        <div className="mainPageContainer">
            <main>
                <ElectronicsListCRUD/>
            </main>
        </div>
    );
}

export default HomePage;