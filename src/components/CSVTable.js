import { Table } from "react-bootstrap";
import { toTitleCase } from "../app/fallout/wiki/utils";

export default function CSVTable({ csv }) {
    return (
        <Table striped>
            <thead>
                <tr>
                    {Object.keys(csv[0] ?? {}).map((key) => (
                        <th key={key}>
                            {toTitleCase(key)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    csv.map((e, index) => {
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