import BarGraph from "./BarGraph";
import PdfReports from "./PdfReports";

function Analytics(){
    return (
        <div className="analyticsParent">
            <BarGraph />
            <PdfReports />
        </div>
    )
}


export default Analytics;