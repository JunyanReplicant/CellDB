import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Submitting = () => {
    const [submitInfo, updateSubmitInfo] = useState({
        FirstName: "",
        LastName: "",
        job: "",
        machine: "",
        id: "",
        date: new Date(),
        extLink: "",
        dataType: "",
        cellType: "",
        treatmentType: "",
        dosage: "",
        details: "",
        dataInString: "",
        uploadData: "",
    });
    const [success, updateSuccess] = useState(0);
    let dataUpload;

    useEffect(() => {
        console.log("Updating");
    }, [success]);
    const handleChange = (e, id, value) => {
        let currentInfo = { ...submitInfo };
        if (e.target) {
            currentInfo[e.target.id] = e.target.value;
        } else {
            currentInfo[id] = e;
        }
        updateSubmitInfo(currentInfo);
    };
    if (!submitInfo["uploadData"]) {
        dataUpload = (
            <div>
                <label> Alert </label>
                <div className="alert alert-primary" role="alert">
                    Waiting for input data
                </div>
            </div>
        );
    } else if (submitInfo["uploadData"] == "Raw Data") {
        dataUpload = (
            <div>
                <Formtext
                    value={submitInfo["dataInString"]}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    id="dataInString"
                    label="Raw Data"
                    placeholder=""
                />
            </div>
        );
    } else {
        dataUpload = (
            <div>
                <label> Alert </label>
                <div className="alert alert-danger" role="alert">
                    Sorry not supported yet
                </div>
            </div>
        );
    }

    async function uploadToServer() {
        updateSuccess(1);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitInfo),
        };
        console.log(submitInfo);
        let response = await fetch("http://localhost:3000/api", requestOptions);
        console.log(response.statusText);
        if (response.statusText == "OK") {
            updateSuccess(2);
        }
    }

    let formWhole = (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                uploadToServer();
            }}
        >
            <div className="form-group">
                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <Formfill
                        value={submitInfo["FirstName"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="4"
                        id="FirstName"
                        label="First Name"
                        placeholder=""
                    />
                    <div className="col-md-1 mb-3"></div>
                    <Formfill
                        value={submitInfo["LastName"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="4"
                        id="LastName"
                        label="Last Name"
                        placeholder=""
                    />
                </div>

                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <Formfill
                        value={submitInfo["job"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="4"
                        id="job"
                        label="Experiment Name"
                        placeholder=""
                    />
                    <div className="col-md-1 mb-3"></div>
                    <FormSelect
                        value={submitInfo["machine"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="4"
                        id="machine"
                        label="Machine"
                        options={["S3", "ZOOM", "Biotek"]}
                    />
                </div>
                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <Formfill
                        value={submitInfo["id"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="3"
                        id="id"
                        label="Vessel id"
                        placeholder=""
                    />
                    <Formfill
                        value={submitInfo["cellType"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="3"
                        id="cellType"
                        label="Cell Type"
                        placeholder=""
                    />
                    <Formfill
                        value={submitInfo["treatmentType"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="3"
                        id="treatmentType"
                        label="Treatment Type"
                        placeholder=""
                    />
                </div>
                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <Formfill
                        value={submitInfo["extLink"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="2"
                        id="extLink"
                        label="Link to images/data"
                        placeholder=""
                    />
                    <FormSelect
                        value={submitInfo["dataType"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="3"
                        id="dataType"
                        label="Data Type"
                        options={["Confluence", "Cell Number", "Fluorescence Intensity"]}
                    />
                    <Formfill
                        value={submitInfo["dosage"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="2"
                        id="dosage"
                        label="Dose"
                        placeholder=""
                    />
                    <div className="col-md-3 mb-3 ">
                        <label htmlFor="date">Experiment Start Date</label>
                        <DatePicker
                            selected={submitInfo["date"]}
                            onChange={(e) => {
                                handleChange(e, "date");
                            }}
                            id="date"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <div className="col-md-8 mb-3">
                        <Formtext
                            value={submitInfo["details"]}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            id="details"
                            label="Experiment Details"
                            placeholder=""
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1 mb-3"></div>
                    <FormSelect
                        value={submitInfo["uploadData"]}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        length="3"
                        id="uploadData"
                        label="Upload method"
                        options={["Raw Data", "File upload"]}
                    />

                    <div className="col-md-6 mb-3">{dataUpload}</div>
                </div>

                <div className="row">
                    <div className="col-md-5 mb-3"></div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );

    let uploading = (
        <div>
            <h1>Working on......</h1>
            <p>We are uploading data, don't refresh page!</p>
        </div>
    );

    let successPage = (
        <div>
            <h1>Success</h1>
            <p>
                We received your data submission;
                <br /> we'll be in touch shortly!
                <br /> Please refresh page if you want submit more data
            </p>
        </div>
    );

    if (success == 0) {
        return formWhole;
    } else if (success == 1) {
        return uploading;
    } else {
        return successPage;
    }
};

const Formfill = (props) => {
    const { value, id, label, placeholder, length } = props;
    let gridStyle = `col-md-${length} mb-3`;
    return (
        <div className={gridStyle}>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={props.onChange}
                required
            />
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

const Formtext = (props) => {
    const { value, id, label, placeholder, length } = props;
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <textarea
                type="text"
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={props.onChange}
                required
            />
        </div>
    );
};
export default Submitting;
