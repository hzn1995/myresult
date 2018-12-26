export default angular
	.module("rWorks", [])
	.component("resumeWorks", {
		templateUrl : "components/_rWorks/cmpt.html",
		controller  : ResumeWorksCtrl
	})
    .directive('switchDrags',["actionEvent",function(actionEvent){
        return{
            link : function(scope,element,attr){
//                      scope可以接收到的数据
//                      element 当前的元素
//                      attr属性

                setTimeout(function () {
                    //初始化
                    init();
                },500);


                function init(){
                    //获取子元素个数，宽度
                    const ele=document.body.querySelector(".-work-list");
                    const element_ch=ele.children.length,
                        element_ch2=document.body.querySelector(".-work-list li");
                    let element_wi;
                    if(element_ch2){
                        element_wi=element_ch2.offsetWidth;
                    }else{
                        element_wi=485;
                    }
                    element[0].style.width=element_ch*element_wi+10*(element_ch-1)+"px";
                    element[0].style.maxWidth=element_ch*element_wi+10*(element_ch-1)+"px";
                }
            },
           restrict:'A', //ECMA        E元素  C类名 M注释 A属性
        };
    }])
    .directive('clickLft',function () {
        return {
            link:function ($scope,ele,attr) {
                let element_wi,worksContain,element_ch;
                let moving=0;
                setTimeout(init,500);
                function init() {
                    worksContain = document.body.querySelector(".-work-list");
                    element_ch=document.body.querySelector(".-work-list li");
                }
                ele[0].addEventListener("click",function () {
                    if(element_ch){
                        element_wi=element_ch.offsetWidth+10;
                    }else{
                        element_wi=485+10;
                    }
                    //获取偏移值
                    let leftV=worksContain.style.transform;
                    if(leftV){
                        leftV=parseInt(leftV.replace("translateX(",""));
                    }else{
                        leftV=0;
                    }
                    if(Math.abs(leftV)>0){
                        //每次滑动值
                        moving=leftV+element_wi;
                        worksContain.style.transform="translateX("+moving+"px)";
                        worksContain.style.transition="transform .5s";
                    }
                    return false;
                })
            }
        }
    })
    .directive('clickRight',function () {
        return {
            link:function ($scope,ele,attr) {
                let element_wi,worksContain,element_ch;
                let moving=0;
                setTimeout(init,500);
                function init() {
                    worksContain = document.body.querySelector(".-work-list");
                    element_ch=document.body.querySelector(".-work-list li");
                }
                ele[0].addEventListener("click",function () {
                    if(element_ch){
                        element_wi=element_ch.offsetWidth+10;
                    }else{
                        element_wi=485+10;
                    }
                    //获取偏移值
                    let leftV=worksContain.style.transform;
                    if(leftV){
                        leftV=parseInt(leftV.replace("translateX(",""));
                    }else{
                        leftV=0;
                    }
                    if(Math.abs(leftV)<=(parseInt(worksContain.style.width)-element_wi)){
                        //每次滑动值
                        moving=leftV-element_wi;
                        worksContain.style.transform="translateX("+moving+"px)";
                        worksContain.style.transition="all .5s";
                    }
                   return false;
                })
            }
        }
    })
	.name;

ResumeWorksCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeWorksCtrl(dataExtend,resumeData,$rootScope, $scope) {
    let vm = this;

    dataExtend.extend(vm, resumeData.cn.works);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.works:resumeData.cn.works;

        vm.isEng = Number(data) == 2;

        dataExtend.extend(vm, extendData);
	
	    $scope.$apply();
    });
}