import Head from "next/head"
import { useRouter } from "next/router"
const DynamicIndex = () => {
    const router = useRouter();
    const query = router.query;

    return (
        <>
        <Head>
            <title>{query.id}</title>
        </Head>
            Page {query.id}
        </>
    )

}
export default DynamicIndex;