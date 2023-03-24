function UserProfilePage(props) {
    // we indentify the user when they request this page.
    return <h1>{props.userName}</h1>


}

export default UserProfilePage

export async function getServerSideProps(context) {
    const { params, req, res} = context;

    
    return {
        // same format as getStaticProps
        props: {
             userName: 'Max'
        }
    };
}