package dataStructure.action;

import dataStructure.dao.ManageUserDao;
import dataStructure.vo.User;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

public class ManageUserAction extends ActionSupport {
    private User u;
    private String prepassword;
    private String newpassword;
    private String newName;
    
    public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public String getPrepassword() {
		return prepassword;
	}

	public void setPrepassword(String prepassword) {
		this.prepassword = prepassword;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public User getU() {
		return u;
	}

	public void setU(User u) {
		this.u = u;
	}

	//注册
    public String registerAc() throws SQLException, ClassNotFoundException {
        ManageUserDao mud=new ManageUserDao();
        List<User> user=mud.queryUserByPhone(u.getPhonenum());
        HttpServletRequest request=ServletActionContext.getRequest();

        if(user.size()!=0){
            request.setAttribute("message","该手机号已注册过！");
            return "add_fail";
        }else{
            mud.register(u);
            return "add_user";
        }
    }

    //登录
    public String loginAc() throws SQLException, ClassNotFoundException {
        ManageUserDao mud = new ManageUserDao();
        List<User> user = mud.queryUserByPhone(u.getPhonenum());
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession();

//        System.out.println("user:"+user.get(0).getName()+" u:"+u.getName()+" "+u.getPassword());
        
        if(user.size()==0){
            request.setAttribute("message","尚未注册，请先注册！");
            return "login_fail";
        }else if(user.get(0).getName().equals(u.getName())&&user.get(0).getPassword().equals(u.getPassword())){
            session.setAttribute("current_user",user.get(0));
            return "login_success";
        }else{
            request.setAttribute("message","用户名或密码错误，请重新输入！");
            return "login_fail";
        }
    }


  //修改密码
    public String changePasswordAc() throws SQLException, ClassNotFoundException, IOException {
        HttpServletRequest request=ServletActionContext.getRequest();
       
        HttpSession session = request.getSession();
        User cu=(User)session.getAttribute("current_user");
//        System.out.println(cu.getPassword()+" "+prepassword+" "+newpassword);

        if(cu.getPassword().equals(prepassword)){
            ManageUserDao mud=new ManageUserDao();
            mud.changePassword(cu.getUserid(),newpassword);
            request.setAttribute("message","密码修改成功！");
            cu.setPassword(newpassword);
            session.setAttribute("current_user", cu);
            return "change_success";
        }else{
            request.setAttribute("message","原密码错误，密码修改失败！");
            return "change_fail";
        }
    }
    
  //修改名称
    public String changeNameAc() throws SQLException, ClassNotFoundException {
        HttpServletRequest request=ServletActionContext.getRequest();
        HttpSession session = request.getSession();
        User cu =(User) session.getAttribute("current_user");
        
        ManageUserDao mud=new ManageUserDao();
        mud.changeName(cu.getUserid(),newName);

        cu.setName(newName);
        session.setAttribute("current_user", cu);
        
        System.out.println(cu.getName());
        return "change_name_success";
    }
    
    //退出登录
    public String cancelLoginAc(){
        HttpServletRequest request=ServletActionContext.getRequest();
        HttpSession session=request.getSession();
        session.removeAttribute("current_user");
//        System.out.println(session.getAttribute("current_user").toString());
        return "cancel_login";
    }
    
    //修改手机号
    public String changePhoneAc() throws ClassNotFoundException, SQLException {
    	HttpServletRequest request=ServletActionContext.getRequest();
    	HttpSession session=request.getSession();
    	
    	//新的手机号
    	String newphone=request.getParameter("newphone");
    	//根据新手机号查找用户
    	ManageUserDao mud=new ManageUserDao();
    	List<User> users=mud.queryUserByPhone(newphone);
    	
    	//新手机号已被注册
    	if(users.size()!=0) {
    		request.setAttribute("message", "该手机号已被注册，修改失败！");
    		return "changePhone_fail";
    	}else {
    		//当前用户id
    		User cu=(User)session.getAttribute("current_user");
    		String id=cu.getUserid();
    		
    		//修改当前用户手机号
    		mud.changePhone(id,newphone);
    		request.setAttribute("message", "手机号修改成功");
    		cu.setPhonenum(newphone);
    		session.setAttribute("current_user", cu);
    		return "changePhone_success";
    	}
    	
    }
    
}

