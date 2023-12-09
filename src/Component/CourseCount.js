import React from "react";

function CourseCount() {
  return (
    <div class="ui segment">
      <h2 class="ui header">
        <i class="archive icon"></i>
        <div class="content">
          您已共选 <span class="cc-credit-total"> 0 </span> 学分
          <div class="sub header">
            还需再选 <span class="cc-credit-remain"> 0 </span> 学分
          </div>
        </div>
      </h2>
      <h6 class="ui horizontal divider header">学分明细</h6>
      <p>以下会列出您的学分明细，请认真核对</p>
      <ul class="ui list">
        <li>
          本专业核专 <span class="cc-credit-core-major"> 0 </span> 分（不计入）
        </li>
        <li>
          其他专业核专 <span class="cc-credit-core-other"> 0 </span> 分
        </li>
        <li>
          一般专业 <span class="cc-credit-general"> 0 </span> 分
        </li>
        <li>
          有效有共计 <span class="cc-credit-total"> 0 </span> 分
        </li>
        <li>
          剩余应选 <span class="cc-credit-remain"> 0 </span> 分
        </li>
      </ul>
      <h6 class="ui horizontal divider header">课程明细</h6>
      <p>以下会列出您选择的课程，请认真核对</p>
      <div class="ui relaxed divided list" id="course-list">
        <div
          class="item"
          id="left-courses-list-item-template"
          style={{ display: "none" }}
        >
          <i class="large book middle aligned icon"></i>
          <div class="content">
            <div class="header">
              <span class="cc-course-name">示例课程</span>/
              <span class="cc-course-major">核心专业类</span>
            </div>
            <div class="description">
              <span class="cc-course-credit">2学分</span>
              <span class="cc-course-grade">大三</span>
              <span class="cc-course-term">秋季</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCount;
