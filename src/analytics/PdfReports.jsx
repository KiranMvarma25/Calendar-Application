import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import Papa from "papaparse";
import { useSelector } from "react-redux";

function PdfReports() {

    const companyData = useSelector((state) => state.admin.companyData);

    const getFrequencyData = () => {
        const frequency = companyData.reduce((acc, company) => {
            company.communications.forEach(comm => {
                acc[comm.type] = (acc[comm.type] || 0) + 1;
            });
            return acc;
        }, {});

        return frequency;
    };

    const frequency = getFrequencyData();

    const styles = StyleSheet.create({
        page : {
            padding : 20,
        },
        section : {
            marginBottom : 10,
        },
        heading : {
            fontSize : 18,
            marginBottom : 10,
        },
        table : {
            display : "flex",
            flexDirection : "column",
        },
        row : {
            flexDirection : "row",
            justifyContent : "space-between",
            marginBottom : 5,
        },
        cell : {
            fontSize : 12,
        },
    });

    
    const MyDocument = () => (

        <Document>

            <Page size="A4" style={styles.page}>

                <View style={styles.section}>

                    <Text style={styles.heading}>Analytics Report</Text>
                </View>

                <View style={styles.section}>
                    <Text>Communication Frequencies:</Text>
                    <View style={styles.table}>
                        {Object.entries(frequency).map(([type, count], index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cell}>{type}</Text>
                                <Text style={styles.cell}>{count}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </Page>

        </Document>

    );

    const exportToCSV = () => {

        const csvData = Object.entries(frequency).map(([type, count]) => ({
            "Communication Type" : type,
            Frequency : count,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "analytics-report.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="pdfReports">

                <h2 className="pdfReportsHeading">Download Reports</h2>

                <div className="pdfReportsButtons">
                    <PDFDownloadLink document={<MyDocument />} fileName="analytics-report.pdf" className="pdfReportsButtonsBtn" >
                        {({ loading }) => (loading ? "Loading PDF..." : "Download PDF")}
                    </PDFDownloadLink>

                    <button onClick={exportToCSV} className="download-btn">Download CSV</button>

                </div>

            </div>
        </>
    );
}

export default PdfReports;