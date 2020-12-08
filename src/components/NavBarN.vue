<template>
  <vsm-menu
    :menu="menu"
    :base-width="380"
    :base-height="200"
    :screen-offset="10"
    element="header"
    handler="click"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #default="{ item }">
      <div class="wrap-content">
        <div class="wrap-content__block">{{ item.title }}</div>
        <div class="wrap-content__item">
          {{ item }}
        </div>
      </div>
    </template>
    <template #before-nav>
      <!--Image or svg of website logo-->
      <li class="vsm-section logo-section">
        <img src="@/assets/image/logo/nxtoffice-dark.png" alt="Logo" />
      </li>
    </template>
    <template #title="data">
      <!--Display menu items through slots-->
      {{ data.item.title }}
    </template>
    <template #after-nav>
      <!--Mobile Burger, buttons, etc-->
      <!--For the same styles - add the vsm-section-->
      <!--      <li class="vsm-section vsm-mob-hide">-->
      <!--        <button>My Button</button>-->
      <!--      </li>-->
      <!--Display when user media screen below from $vsm-media (scss)-->
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          // display menu item (or override title slot)
          title: "News",
          // now this is not a link, but a menu item where there is a dropdown
          dropdown: "news",
          // don't want a button element?
          element: "span",
          // menu item can accept all attributes
          attributes: {
            // I want more classes! No problem
            // string, array, object, not matter
            class: ["my-class1", { "my-class2": true }],
            // Custom attributes
            "data-big": "yes"
          },
          // add some events?
          listeners: {
            // all possible native events
            mouseover: evt => {
              console.log("news hover", evt);
            }
          },
          // just extra properties in the object
          new_section: false
        },
        {
          title: "External Link",
          attributes: {
            href: "https://github.com/Alexeykhr/vue-stripe-menu",
            target: "_blank"
          }
        }
        // ...
      ]
    };
  },
  methods: {
    onOpenDropdown() {
      console.log("onOpenDropdown");
    },
    onCloseDropdown() {
      console.log("onCloseDropdown");
    }
  }
};
</script>

<style lang="scss">
@import "src/style/abstracts/variables";
// Styles, to quickly start using the component
// You can delete, change or add your own

// Limit the width to 1024px and center
.vsm-menu {
  position: sticky;
  background: $theme-bg;
  z-index: 10;
  ul {
    /*max-width: 1024px;*/
    margin: 0 10px;
  }
}

// Let's simplify the work with menu items (logo, menu, buttons, etc)
.vsm-root {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}

// Move all the content to the right and reduce the logo
.logo-section {
  flex: 1 1 auto;
  img {
    user-select: none;
    max-width: 100px;
  }
}

// All menu items (element props: a, button, span, etc) are
// made the same in style
.vsm-section_menu {
  > * {
    padding: 0 25px;
    font-weight: 500;
  }
}

// Styles for Dropdown Content:
.wrap-content {
  padding: 30px;
  // Set the width manually so that it does not depend
  // on changing content
  width: 400px;
}
.wrap-content__block {
  font-weight: bold;
}
.wrap-content__item {
  font-style: italic;
  font-size: 0.8rem;
}

.content,
.content--secondary,
.mobile-content {
  padding: 30px;
}

.content--secondary {
  padding-top: 10px;
  padding-bottom: 10px;
}

.dropdown--section_title {
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
  &:not(:first-child) {
    margin-top: 20px;
  }
}

.dropdown-wrap__content {
  display: flex;
  align-items: center;
  color: var(--primary);
  text-decoration: none;
  padding: 10px 5px 10px 0;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &.type1 {
    span {
      margin-left: 10px;
    }
  }
  &.type2 {
    align-items: flex-start;
    > div {
      margin-left: 10px;
    }
    .content--bottom {
      color: var(--secondary);
    }
  }
}
</style>
