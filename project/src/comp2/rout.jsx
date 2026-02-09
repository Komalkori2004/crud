import { BrowserRouter, Route, Routes } from "react-router-dom";
import Table from "./tablet"
import AddUser from "./adduser2"
import Update from "./update";


function Rou() {


    return (<>



        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Table></Table>}></Route>
                <Route path="/add" element={<AddUser></AddUser>}></Route>
                <Route path="/update/:id" element={<Update></Update>}></Route>

            </Routes>


        </BrowserRouter>
    </>)
}

export default Rou


