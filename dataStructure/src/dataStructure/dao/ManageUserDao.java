package dataStructure.dao;


import dataStructure.util.DBUtil;
import dataStructure.vo.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ManageUserDao {
    //通过电话号查用户
    public List<User> queryUserByPhone(String phonenum) throws SQLException, ClassNotFoundException {
        Connection conn= DBUtil.getConnection();

        PreparedStatement pstmt=conn.prepareStatement("select * from t_user " +
                "where phonenum=?");
        pstmt.setString(1,phonenum);
        ResultSet rs = pstmt.executeQuery();
        List<User> lists=new ArrayList<>();
        while(rs.next()){
            User u=new User();
            u.setUserid(rs.getString("userid"));
            u.setPhonenum(rs.getString("phonenum"));
            u.setName(rs.getString("name"));
            u.setSex(rs.getString("sex"));
            u.setPassword(rs.getString("password"));
            lists.add(u);
        }

        conn.close();
//        System.out.println("lists:"+lists);
        return lists;
    }

    //注册用户
    public void register(User u) throws SQLException, ClassNotFoundException {
        Connection conn= DBUtil.getConnection();

        PreparedStatement pstmt=conn.prepareStatement("insert into t_user(phonenum,name,sex,password)" +
                "values(?,?,?,?)");
        pstmt.setString(1,u.getPhonenum());
        pstmt.setString(2,u.getName());
        pstmt.setString(3,u.getSex());
        pstmt.setString(4,u.getPassword());
        pstmt.execute();

        conn.close();
    }

  //修改密码
    public void changePassword(String id,String newPassword) throws SQLException, ClassNotFoundException {
        Connection conn= DBUtil.getConnection();

        PreparedStatement pstmt=conn.prepareStatement("update t_user " +
                "set password=? where userid=?");
        pstmt.setString(1,newPassword);
        pstmt.setString(2,id);
        pstmt.executeUpdate();

        conn.close();
    }
    
  //修改名称
    public void changeName(String id,String name) throws SQLException, ClassNotFoundException {
        Connection conn= DBUtil.getConnection();

        PreparedStatement pstmt=conn.prepareStatement("update t_user " +
                "set name=? where userid=?");
        pstmt.setString(1,name);
        pstmt.setString(2,id);
        pstmt.executeUpdate();

        conn.close();
    }
	
	
	//修改手机号
    public void changePhone(String id,String phone) throws SQLException, ClassNotFoundException{
    	Connection conn= DBUtil.getConnection();

        PreparedStatement pstmt=conn.prepareStatement("update t_user " +
                "set phonenum=? where userid=?");
        pstmt.setString(1,phone);
        pstmt.setString(2,id);
        pstmt.executeUpdate();

        conn.close();
    }

}
