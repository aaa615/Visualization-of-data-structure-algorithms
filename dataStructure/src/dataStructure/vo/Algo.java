package dataStructure.vo;

public class Algo {
    private String algoid;
    private String algoname;
    private String algourl;

    
    
    @Override
	public String toString() {
		return "Algo [algoid=" + algoid + ", algoname=" + algoname + ", algourl=" + algourl + ", getAlgoid()="
				+ getAlgoid() + ", getAlgoname()=" + getAlgoname() + ", getAlgourl()=" + getAlgourl() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

	public String getAlgoid() {
        return algoid;
    }

    public void setAlgoid(String algoid) {
        this.algoid = algoid;
    }

    public String getAlgoname() {
        return algoname;
    }

    public void setAlgoname(String algoname) {
        this.algoname = algoname;
    }

    public String getAlgourl() {
        return algourl;
    }

    public void setAlgourl(String algourl) {
        this.algourl = algourl;
    }
}
