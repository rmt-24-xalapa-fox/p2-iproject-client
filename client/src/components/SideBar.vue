<script>
export default {
    name: "Sidebar"
}
</script>

<template>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="index.html">
                <h2>Count Me in</h2>
              </a>
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
            </div>
          </div>
        </div>
        <div class="sidebar-menu">
          <ul class="menu">
            <li class="sidebar-title">Menu</li>

            <li class="sidebar-item active">
              <a href="" class="sidebar-link" id="products-btn">
                <i class="bi bi-grid-fill"></i>
                <span>Products</span>
              </a>
            </li>
            <li class="sidebar-item active">
              <a href="" class="sidebar-link" id="categories-btn">
                <i class="bi bi-grid-fill"></i>
                <span>Categories</span>
              </a>
            </li>
            <li class="sidebar-item active">
              <a href="" class="sidebar-link" id="history-btn">
                <i class="bi bi-grid-fill"></i>
                <span>Histories</span>
              </a>
            </li>
          </ul>
        </div>
        <button class="sidebar-toggler btn x btn-light" type="button">
          <i data-feather="x"></i>
        </button>
      </div>
    </div>
</template>