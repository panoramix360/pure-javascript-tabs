window.onload = function() {

	var plugins = (function() {

		/**
		*	Função inicializa as abas, escondendo as divs e apenas mostrando as que devem aparecer inicialmente.
		*/
		function initialize() {

			hideDivs();

			setLiActive(config.initTab);
			showDiv(getDiv(config.initTab));

			forEach(lis, function(li) {
				addEventHandler(li, 'click', clickMenu);
			});
		}

		// Função que controla a inicialização das abas (não implementada)
		function configObject() {
			
			var config;

			log(extend.tab_id);

			if( typeof extend === 'object' ) {
				config = extend;
			} else {
				config = {
					tab_id: 'tabs',
					initTab: 'menu1'
				};
			}

			log(typeof extend);

			return config;
		}

		var config = {
			tab_id: 'tabs',
			initTab: 'menu1'
		};

		/*
			Cria as variáveis de tudo que será usado na criação das abas
		*/
		var tabs_div = _$(config.tab_id),
			$ul = tabs_div.getElementsByTagName('ul')[0],
			lis = $ul.getElementsByTagName('li'),

			divs = tabs_div.getElementsByTagName('div'),
			divs_count = divs.length;

		// Função para o evento de clique em cada li
		function clickMenu(e) {

			var li = e.target;

			clearActive();
			hideDivs();

			setLiActive(li.className);

			showDiv(getDiv(resetClass(li.className)));
		}

		// Função Helper para mostrar a div informada
		function showDiv(div) {
			div.className = 'show';
		}

		// Função Helper que adiciona uma classe para esconder todas as divs
		function hideDivs() {
			forEach(divs, function(div) {
				div.className = 'hide';
			});
		}

		// Função Helper que recupera todas as classes do menu das abas
		function getMenuClasses(arr) {
			var classes = [];

			forEach(arr, function(ar) {
				var class_name = ar.className;

				classes.push(resetClass(class_name));
			});

			return classes;
		}

		// Função que recupera uma div com id igual ao id informado
		function getDiv(id) {
			var found;
			
			for( var i = 0; i < divs_count; i++ ) {
				if( divs[i].getAttribute('id') === id  ) {
					found = divs[i];
					break;
				}
			}

			return found;
		}

		// Função que altera o nome da classe e exclui o active da classe
		function resetClass(class_name) {
			var index = class_name.indexOf(' active'),
				result = class_name;

			if( index != -1 ) {
				result = class_name.substring(0, index);
			}

			return result;
		}

		// Retira o active de todos os li
		function clearActive() {
			forEach(lis, function(li) {
				var class_name = li.className;

				li.className = resetClass(class_name);
			});
		}

		// Função que coloca active numa das li
		function setLiActive(class_name) {
			forEach(lis, function(li) {
				if( li.className == class_name ) {
					li.className += ' active';
				}
			});
		}

		return {
			tabify: function() {
				initialize();
			}
		};

	})();

	plugins.tabify();
};