import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let searchDetails = [];
const Searching = () => {
    const [searching, updateSearching] = useState([]);
    const [searchAction, updateSearchAction] = useState(<div>Begin Search!</div>);
    const [tableCon, updatetableCon] = useState(<div></div>);
    const [curRow, updatecurRow] = useState(0);

    const handleChange = (e, id, value) => {
        let currentInfo = { ...submitInfo };
        if (e.target) {
            currentInfo[e.target.id] = e.target.value;
        } else {
            currentInfo[id] = e;
        }
    };

    async function deleteToApi() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("http://localhost:3000/deleteApi", requestOptions);
        response = await response.json();

        updatetableCon(<div></div>);
    }
    async function searchToApi() {
        searchDetails = [];
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("http://localhost:3000/searchApi", requestOptions);
        let response1 = await response.json();
        console.log(response1.data);

        if (response.statusText == "OK") {
            let searchResults = [];

            let table_temp;

            response1.data.map((el, index) => {
                searchDetails.push(el);
                searchResults.push(
                    <tr
                        key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            updatecurRow(index);
                        }}
                    >
                        <th scope="row">{el.firstName + " " + el.lastName}</th>
                        <td>{el.job}</td>
                        <td>{el.exp.cellType}</td>
                        <td>{el.exp.machine}</td>
                    </tr>
                );
            });
            table_temp = (
                <div className="container">
                    <div className="row">
                        <div className="col s12 board">
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Person</th>
                                        <th scope="col">Exp type</th>
                                        <th scope="col">Cell type</th>
                                        <th scope="col">Machine</th>
                                    </tr>
                                </thead>
                                <tbody>{searchResults}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
            updatetableCon(table_temp);
        }
    }

    const handleSearchButton = (e) => {
        e.preventDefault();
        searchToApi();
        updateSearchAction(
            <div>
                <label> Alert </label>
                <div className="alert alert-danger" role="alert">
                    Sorry conditional searching not supported yet, below is all documents, click on
                    table rows for details
                </div>
            </div>
        );
    };

    const handleDeleteButton = (e) => {
        e.preventDefault();
        deleteToApi();
        updateSearchAction(
            <div>
                <label> Alert </label>
                <div className="alert alert-warning" role="alert">
                    Successfully delete everything!
                </div>
            </div>
        );
    };
    return (
        <div>
            <div className="row">
                <div className="col-md-1  mb-3"></div>
            </div>
            <div className="row">
                <div className="col-md-1  mb-3"></div>

                <FormSelect
                    value={searching["basedOn"]}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    length="4"
                    id="basedOn"
                    label="Searching"
                    options={["Name", "Exp type", "treatment type"]}
                />

                <div className="col-md-3  mb-3">
                    <label htmlFor="searchButton"></label>
                    <button
                        type="submit"
                        id="searchButton"
                        style={{ marginTop: "10px" }}
                        className="btn btn-primary btn-block"
                        onClick={handleSearchButton}
                    >
                        Submit
                    </button>
                </div>
                <div className="col-md-3  mb-3">
                    <label htmlFor="deleteButton"></label>
                    <button
                        type="submit"
                        id="deleteButton"
                        style={{ marginTop: "10px" }}
                        className="btn btn-danger btn-block"
                        onClick={handleDeleteButton}
                    >
                        Delete all data
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1  mb-3"></div>
                <div className="col-md-6 mb-3">{searchAction}</div>
            </div>
            <div className="row">
                <div className="col-md-1  mb-3"></div>
                <div>{tableCon}</div>
                <DetailTable el={searchDetails[curRow]} />
            </div>
        </div>
    );
};

const DetailTable = (props) => {
    if (!props.el) {
        return <div></div>;
    }
    const {
        Details,
        exp: { cellType, dataType, dosage, extLink, id, machine, startDate },
        firstName,
        job,
        lastName,
        dataInString,
    } = props.el;

    return (
        <div className="col-md-4 ">
            <table className=" table table-dark">
                <tbody>
                    <tr>
                        <td>Cell type</td>
                        <td>{cellType}</td>
                    </tr>
                    <tr>
                        <td>Data Type</td>
                        <td>{dataType}</td>
                    </tr>
                    <tr>
                        <td>Link</td>
                        <td>{extLink}</td>
                    </tr>
                    <tr>
                        <td>id</td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>Details</td>
                        <td>{Details}</td>
                    </tr>

                    <tr>
                        <td>Exp date</td>
                        <td>{startDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
const FormSelect = (props) => {
    const { value, id, label, length, options } = props;
    let gridStyle = `col-md-${length} mb-3`;
    return (
        <div className={gridStyle}>
            <label htmlFor={id}>{label}</label>
            <select className="custom-select" id={id} value={value} onChange={props.onChange}>
                <option defaultValue> </option>
                {!options.length ? (
                    <option value="0">No Options</option>
                ) : (
                    options.map((el) => {
                        return (
                            <option key={el} value={el}>
                                {el}
                            </option>
                        );
                    })
                )}
            </select>
        </div>
    );
};

export default Searching;
