<template>
	<div class="home" v-if="!is_mobile()"> <!-- PC -->
		<layout-navigation />
		<layout-header />

		<div class="contents">

			<!-- Title -->
			<div class="section-1">
				<layout-search />
			</div>
			<!-- Title End -->

			<!-- Pee -->
			<div class="section-2" v-if="list.length > 0">
				<pee :grid="{ img : 'auto' }" :post="list" />
			</div>
			<!-- Pee End -->

		</div>

		<layout-footer />
	</div>
	<div class="home mobile" v-else> <!-- Mobile -->
		<layout-navigation />
		<layout-header />
		
		<div class="contents">

		</div>

		<layout-footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import Search from '@/components/widget/main/search'
import Grid from '@/components/widget/main/grid-square'

const postStore = 'postStore'

export default {
	name: 'Home',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
        'layout-footer' : Footer,
		'layout-search': Search,
		'pee' : Grid
	},
	data(){
		return {
			list : []
		}
	},
	methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
		is_mobile(){ return IS_MOBILE() },
		UpdateData(){
            return { board: 'photo', page: 0, view: 50 };
        },
        ListLoad(){
            const data = this.UpdateData();
            this.POST_LIST(data).then((req) => {
				this.list = req.list;
				
                console.log(this.list);
            }).catch((err) => {
                console.log(err);
            })
        }
	},
	created(){
		this.ListLoad();
	}
}

</script>

<style scoped lang="scss">
	.section-1 {
		& {
			width: 100%;
			height: auto;
			padding: 70px;
			margin: 0 auto;
			position: relative;
		}

		& > .title {
			& {
				position: absolute;
				right: 100%; top: 50%;
			}

			& > h1 {
				font-size: 64px;
				color: $bg-orange;
				letter-spacing: -5px;
				font-family: $notoKR-B;
				display: inline-block;
				@include transform(rotate(90deg));
			}

			& > p {
				margin-top: 15px;
				line-height: 1.6;
			}
		}
	}

	.section-2 {
		& {
			width: 100%;
			max-width: 1920px;
			height: auto;
			margin: 0px auto 0 auto;
		}
	}

</style>
