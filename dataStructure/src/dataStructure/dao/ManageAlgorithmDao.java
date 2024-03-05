package dataStructure.dao;

import dataStructure.util.DBUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import dataStructure.vo.User;
import dataStructure.vo.Algo;
import dataStructure.util.DBUtil;

public class ManageAlgorithmDao {
	//Ä£ºý²éÕÒËã·¨
	public List<Algo> queryAlgoByName(String name)throws IllegalAccessException,ClassNotFoundException,
    SQLException, InstantiationException{
		List<Algo> list=new ArrayList<>();
		String sql;
		Connection conn=DBUtil.getConnection();
		if(name==""){
			sql="select * from data_structure.t_algorithm";
		}
		else{
			sql="select * from data_structure.t_algorithm where algoname like \'%"+name+"%\'";
		}
//		System.out.println(sql);
		Statement stmt=conn.createStatement();
		ResultSet rs=stmt.executeQuery(sql);
		while(rs.next()){
			Algo algo =new Algo();
			algo.setAlgoid(rs.getString("algoid"));
			algo.setAlgoname(rs.getString("algoname"));
			algo.setAlgourl(rs.getString("algourl"));
			list.add(algo);
		 }
		stmt.close();
		conn.close();
		
//			System.out.println((Algo)list.get(0));
			return list;
	}
	
}
