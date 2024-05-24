"use client"
import csvtojson from "csvtojson";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export default function CSVTable({ csv }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        csvtojson().fromString(csv).then((json) => {
            setData(json);
        });
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    {Object.keys(data[0] ?? {}).map((key) => (
                        <th key={key}>
                            {toTitleCase(key)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((e, index) => {
                        return (
                            <tr key={index}>
                                {Object.keys(e).map((key) => (
                                    <td key={key}>
                                        {e[key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
};