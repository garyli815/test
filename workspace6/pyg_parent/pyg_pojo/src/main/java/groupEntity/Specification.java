package groupEntity;

import com.pyg.pojo.TbSpecification;
import com.pyg.pojo.TbSpecificationOption;

import java.io.Serializable;
import java.util.List;

//规格和规格小项的组合类
public class Specification implements Serializable {

    private TbSpecification tbSpecification;

    private List<TbSpecificationOption> tbSpecificationOptions;

    public TbSpecification getTbSpecification() {
        return tbSpecification;
    }

    public void setTbSpecification(TbSpecification tbSpecification) {
        this.tbSpecification = tbSpecification;
    }

    public List<TbSpecificationOption> getTbSpecificationOptions() {
        return tbSpecificationOptions;
    }

    public void setTbSpecificationOptions(List<TbSpecificationOption> tbSpecificationOptions) {
        this.tbSpecificationOptions = tbSpecificationOptions;
    }
}
