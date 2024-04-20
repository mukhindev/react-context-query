import * as postApi from "../../api";
import { createQueryContext } from "../../../query/components/ContextQuery";

export const PostContextQuery = createQueryContext(postApi.getPost);
