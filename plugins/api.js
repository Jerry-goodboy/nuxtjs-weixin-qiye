export default ({ app }, inject) => {
  let apiProtocol = "http";
  let apiHost = "localhost";
  let apiPort = ":9999/pythonweixin/";
  let apiRootPath = apiProtocol + "://" + apiHost + apiPort;

  window.apiPathWin = app.apiPath = {
    
    // 角色接口
    queryRoleList : apiRootPath + "role/queryRoleList" //查询角色列表
    ,saveRole : apiRootPath + "role/saveRole" //保存和更新角色
    ,deleteRole : apiRootPath + "role/deleteRole" //删除角色
    ,getPermissionListByAuth : apiRootPath + "permission/getPermissionListByAuth" //获取角色的权限列表

    ,queryAccountList : apiRootPath + "account/queryAccountList" //查询账号列表

    ,login : apiRootPath + "login" //登录
    ,logout : apiRootPath + "logout" //登出
    ,queryPermissionList : apiRootPath + "permission/queryPermissionList" //查询权限列表
    ,getPermissionListByRoleId : apiRootPath + "permission/getPermissionListByRoleId" //根据角色Id获取权限列表
    ,distributionPermission : apiRootPath + "permission/distributionPermission" //给角色分配权限

    //人员接口
    ,queryEmployeeList : apiRootPath + "employee/queryEmployeeList" //查询人员列表
    ,saveEmployee : apiRootPath + "employee/saveEmployee" //保存和更新人员
    ,deleteEmployee : apiRootPath + "employee/deleteEmployee" //删除人员
    ,selectEmployees : apiRootPath + "employee/getLabelValueForEmployee" //人员下拉框接口

    //账号接口
    ,queryAccountList : apiRootPath + "account/queryAccountList" //查询账号列表
    ,queryRoleListForAccount : apiRootPath + "role/queryRoleListForAccount" //查询角色列表--账号管理页面
    ,saveAccount : apiRootPath + "account/saveAccount" //新增或编辑账号
    ,deleteAccount : apiRootPath + "account/deleteAccount" //删除账号
    ,distributionRole : apiRootPath + "account/distributionRole" //给账户分配角色

  }

  window.routerPath = app.routerPath = {
    home : "/" // 主页面
    ,login : "/auth/login" // 登录页面
    ,logout : "/auth/logout" // 登录页面
    ,error : "/error" // 错误页面
  }


  window.winPurgeGeos = function () {
    var rulerDom = L.DomUtil.get("cs_id_ruler")
  }

}
