package dataStructure.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import dataStructure.dao.ManageAlgorithmDao;
import dataStructure.vo.Algo;
import net.sf.json.JSONObject;

public class ManageAlgorithmAction {
	public Algo algo;
	private String result;
	
	
	
//	public String searchName;
	
	public String getResult() {
		return result;
	}



	public void setResult(String result) {
		this.result = result;
	}



	//≤È—ØÀ„∑®
    public String queryAlgoByNameAc() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException, IOException {
        ManageAlgorithmDao mad=new ManageAlgorithmDao();
        HttpServletRequest request=ServletActionContext.getRequest();        
                        
        String searchName=request.getParameter("searchName");
        List<Algo> lists=mad.queryAlgoByName(searchName);
        
        if(lists.size()!=0){
            request.setAttribute("search_result", lists);
            return "search_success";
        }else{
            return "search_fail";
        }
        
        

    }
}
