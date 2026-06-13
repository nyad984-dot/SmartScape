package smartscape.auth.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByToken(String token);
    Optional<UserEntity> findByPhone(String phone);
    boolean existsByPhone(String phone);
}
