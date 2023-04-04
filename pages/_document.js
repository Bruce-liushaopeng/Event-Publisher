import Document, {Html, Head, Main, NextScript} from "next/document";
class Mydocument extends Document {
    render() {
        return(
            <Html lang='eng'>
                <Head />
                <body>
                    <div id='overlay'/>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

export default  Mydocument;