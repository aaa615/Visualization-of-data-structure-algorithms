<%@ page language="java" contentType="text/html; charset=utf-8"
	import = "java.util.*"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>数据结构算法可视化系统</title>
<link rel="stylesheet" type="text/css" href="../css/global.css">

</head>
<body>
<header class="app-header">
    <div class="header-container">
        <div class="searchBox">
            <form id="searchForm" action="queryAlgoByNameAcManageAlgorithmAction" method="post">
                <input type="text" placeholder="请搜索想学习的算法" name="searchName" id="searchIpt">
                <button type="submit"></button>
            </form>
            <div id="search-drops">
           		<c:forEach items ="${search_result}" var="alist" varStatus="status">
           			<p><a href="${alist.algourl}"  target="iframe1" onclick="t_hidden()">${alist.algoname}</a></p>
           		</c:forEach>
            </div> 
        </div>
        <div class="User-box">
            <div class="User-dropdown">
                <a class="dropdown" id="User-dropdown-id" href="mine.jsp">
                    <span style="font: 16px 'Microsoft YaHei UI';color: #5d6778">我的</span>
                </a>
            </div>
        </div>
    </div>
</header>
<!--<div class="footer"></div>-->
<div class="leftPanel">
    <div class="leftPanel-inner">
        <div class="blank-div"></div>
            <div class="left-nav">
                <ul>
                <li class="main-menu-li"><span>查找</span>
                        <ul class="child-menu-ul">
                            <li>
                                <a href="../animation/search/halfSearch/halfSearch.html" target="iframe1">
                                    <span>折半查找</span>
                                </a>
                            </li>
                            <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>B-树查找</span>
                                </a>
                            </li>
                            <li>
                                <a href="../animation/search/hashSearch/hashSearch.html" target="iframe1">
                                    <span>散列表查找</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    
                    <li class="main-menu-li"><span>排序</span>
                        <ul class="child-menu-ul">
                       	 	<li>
                                <a href="../animation/sort/insertSort/insertSort.html" target="iframe1">
                                    <span>插入排序</span>
                                </a>
                            </li>
                            <li>
                                <a href="../animation/sort/shellSort/shellSort.html" target="iframe1">
                                    <span>希尔排序</span>
                                </a>
                            </li>
                            <li>
                                <a href="../animation/sort/bubbleSort/bubbleSort.html" target="iframe1">
                                    <span>冒泡排序</span>
                                </a>
                            </li>
                            <li>
                                <a href="../animation/sort/quickSort/quickSort.html" target="iframe1">
                                    <span>快速排序</span>
                                </a>
                            </li>
                            <li>
                                <a href="../animation/sort/selectSort/selectSort.html" target="iframe1">
                                    <span>选择排序</span>
                                </a>
                            </li>
                          <!--  <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>堆排序</span>
                                </a>
                            </li>
                            <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>归并排序</span>
                                </a>
                            </li>  -->
                            
                        </ul>

                    </li>
                    
                    <li class="main-menu-li"><span>图</span>
                    	<ul class="child-menu-ul">
                    		<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>深度优先遍历</span>
                                </a>
                         	</li>
                         	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>广度优先遍历</span>
                                </a>
                          	</li>
                          	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>Prim算法求最小生成树</span>
                                </a>
                          	</li>
                          	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>kruskal算法求最小生成树</span>
                                </a>
                          	</li>
                          	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>Dijkstra求最短路径</span>
                                </a>
                          	</li>
                          	<li>
                                <a href="notmade.html"  target="iframe1">
                                    <span>Floyd求最短路径</span>
                                </a>
                          	</li>
                         </ul>
                    </li>
                    
                    <li class="main-menu-li"><span>树</span>
                   	 <ul class="child-menu-ul">
                    	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>遍历二叉树</span>
                                </a>
                         </li>
                         <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>哈夫曼树编码</span>
                                </a>
                          </li>
                          <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>哈夫曼译码</span>
                                </a>
                          </li>
                          </ul>
                    </li>
                    
                    <li class="main-menu-li"><span>栈和队列</span>
                    	<ul class="child-menu-ul">
                    	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>入栈</span>
                                </a>
                          </li>
                          <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>出栈</span>
                                </a>
                          </li>
                          <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>入队</span>
                                </a>
                          </li>
                          <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>出队</span>
                                </a>
                          </li>
                          </ul>
                    </li>
                    
                    <li class="main-menu-li"><span>线性表和链表</span>
                    	<ul class="child-menu-ul">
                   	 	<li>
                                <a href="notmade.html" target="iframe1">
                                    <span>线性表</span>
                                </a>
                         </li>
                         <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>单链表</span>
                                </a>
                         </li>
                         <li>
                                <a href="notmade.html" target="iframe1">
                                    <span>循环链表</span>
                                </a>
                          </li>
                          </ul>
                    </li>
                </ul>
            </div>
    </div>
</div>
<div class="content">
    <iframe id="dynamic_container" name="iframe1" src="hello.html"></iframe>
</div>
<script type="text/javascript" src="../js/global.js"></script>
</body>
</html>