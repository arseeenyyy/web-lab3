package com.github.arseeenyyy;

import com.github.arseeenyyy.utils.Checker;
import com.github.arseeenyyy.utils.Point;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class DatabaseService {
    
    @PersistenceContext(unitName = "default")
    private EntityManager entityManager;

    @Transactional
    public void addPoint(Point point) {
        entityManager.persist(point);
    }
    @Transactional 
    public void removePoint(Point point) {
        Point managedPoint = entityManager.find(Point.class, point.getId());
        if (managedPoint != null) {
            entityManager.remove(managedPoint);
        }
    }

    @Transactional
    public List<Point> getAllPoints() {
        TypedQuery<Point> query = entityManager.createQuery("SELECT p FROM Point p", Point.class);
        return query.getResultList();
    } 
    @Transactional 
    public void updateAllPoints(float radius) {
        List<Point> points = getAllPoints();
        for (Point point : points) {
            point.setR(radius);
            point.setIsHit(Checker.isHit(point.getX(), point.getY(), radius));
        }
    }
    @Transactional
    public void removeAllPoints() {
        entityManager.createQuery("DELETE FROM Point").executeUpdate();
    }
}