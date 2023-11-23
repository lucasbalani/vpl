import useListModels from "../../src/hooks/model/use-list-models";
import ModelsPage from "../../src/pages/models-page";

export const getServerSideProps = async () => {
    const listModels = useListModels();
    const modelsResult = await listModels();        

    return { props: { modelsResult, brandResult: null } };
}

export default ModelsPage;