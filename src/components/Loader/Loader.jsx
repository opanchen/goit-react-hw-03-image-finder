import {Blocks} from 'react-loader-spinner';
import css from "./Loader.module.css";

export const Loader = () => (
        <div className={css.loader}>
        <Blocks
          className="blocks-wrapper"
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div> 
)