package com.kakao.kakaocloud_49.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

//Spring에서 환경설정 클래스를 나타내는 어노테이션
//다른 Bean보다 먼저 읽습니다.
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages={"com.kakao.kakaocloud_49.persistence"})
public class MyBatisConfig {
    @Bean
    public DataSource batisDataSource(){
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName("org.mariadb.jdbc.Driver");
        hikariConfig.setJdbcUrl("jdbc:mariadb://localhost:3306/spring");
        hikariConfig.setUsername("root");
        hikariConfig.setPassword("4015pskc");
        HikariDataSource dataSource = new HikariDataSource(hikariConfig);
        return dataSource;
    }

    @Bean
    public SqlSessionFactory batisSqlSessionFactory(
            @Qualifier("batisDataSource") DataSource batisDataSource,
            ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean sqlSession = new SqlSessionFactoryBean();
        sqlSession.setDataSource(batisDataSource);
        return sqlSession.getObject();

    }

    @Bean
    public SqlSessionTemplate batisSqlSessionTemplate(SqlSessionFactory batisSqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(batisSqlSessionFactory);
    }

}
