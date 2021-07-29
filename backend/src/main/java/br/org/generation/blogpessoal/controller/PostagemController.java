package br.org.generation.blogpessoal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.org.generation.blogpessoal.model.Postagem;
import br.org.generation.blogpessoal.repository.PostagemRepository;
import br.org.generation.blogpessoal.service.PostagemService;

@RestController
@RequestMapping("/postagens")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostagemController {

	@Autowired
	private PostagemRepository postagemRepository;
	
	@Autowired
	private PostagemService postagemService;

	/*
	 * Listar todas as postagens
	 */

	@GetMapping
	public ResponseEntity<List<Postagem>> GetAll() {
		return ResponseEntity.ok(postagemRepository.findAll());
	}

	/*
	 * Listar postagem por id - Forma 01: Usando if/else
	 */

	@GetMapping("ifelse/{id}")
	public ResponseEntity<Postagem> GetByIdIfElse(@PathVariable long id) {

		Optional<Postagem> user = postagemRepository.findById(id);
		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		return ResponseEntity.notFound().build();
	}

	/*
	 * Listar postagem por id - Forma 02: usando Try/Catch
	 */

	@GetMapping("/idTryCatch/{id}")
	public ResponseEntity<Postagem> GetByIdTryCatch(@PathVariable long id) {

		Optional<Postagem> user = postagemRepository.findById(id);
		try {
			return ResponseEntity.ok(user.get());
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

	/*
	 * Listar postagem por id - Forma 03: usando Lambda
	 */

	@GetMapping("/{id}")
	public ResponseEntity<Postagem> GetById(@PathVariable long id) {
		return postagemRepository.findById(id)
			.map(resp -> ResponseEntity.ok(resp))
			.orElse(ResponseEntity.notFound().build());
	}
	
	/*
	 * Consultar postagens por titulo 
	 */
	
	@GetMapping("/titulo/{titulo}")
	public ResponseEntity<List<Postagem>> getByTitulo(@PathVariable String titulo){
		return ResponseEntity.ok(postagemRepository.findAllByTituloContainingIgnoreCase(titulo));
	}

	/*
	 * Criar nova postagem 
	 */
	
	@PostMapping
	public ResponseEntity<Postagem> postPostagem (@RequestBody Postagem postagem){
		return ResponseEntity.status(HttpStatus.CREATED).body(postagemRepository.save(postagem));
	}
	
	/*
	 * Editar uma postagem 
	 */
	
	@PutMapping
	public ResponseEntity<Postagem> putPostagem (@RequestBody Postagem postagem){
		return ResponseEntity.status(HttpStatus.OK).body(postagemRepository.save(postagem));
	}
			
	/*
	 * Deletar uma postagem 
	 */
	@DeleteMapping("/{id}")
	public void deletePostagem(@PathVariable long id) {
		postagemRepository.deleteById(id);

	}	
	
	
	/*
	 * O método findFirst retorna apenas o primeiro registro da tabela Postagens,
	 * cujo atributo Titulo seja exatamente igual da variavel titulo 
	 * (ignorando maiúsculas e/ou minúsculas).
	 * 
	 * Uma boa prática é criar regras para evitar que dados duplicados sejam cadastrados no atributo
	 * em que este tipo de consulta seja utilizada.  
	 * 
	 * */
	
	@GetMapping("/titulo/unico/{titulo}")
	public ResponseEntity<Postagem> findByTitulo(@PathVariable String titulo) {
		return postagemRepository.findFirstByTituloIgnoreCase(titulo)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());

	}
	
	/*
	 * Método Curtir Postagens - Implementado na classe PostagemService
	 * */
	
	@PutMapping("/curtir/{id}")
	public ResponseEntity<Postagem> putCurtirPostagemId (@PathVariable Long id){
		
		return ResponseEntity.status(HttpStatus.OK).body(postagemService.curtir(id));
	
	}
	
	/*
	 * Método Descurtir Postagens - Implementado na classe PostagemService
	 * */
	
	@PutMapping("/descurtir/{id}")
	public ResponseEntity<Postagem> putDescurtirPostagemId (@PathVariable Long id){
		
		return ResponseEntity.status(HttpStatus.OK).body(postagemService.descurtir(id));
	
	}
	
}
