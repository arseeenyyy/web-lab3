package com.github.arseeenyyy;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import java.util.Date;

import com.github.arseeenyyy.utils.*;

@Named("formBean")
@RequestScoped
public class FormBean {
    @Inject
    private DatabaseService databaseService;

    @Inject
    private ResultBean resultBean;

    public void processForm(Point point) {
        long startTime = System.nanoTime();
        boolean isHit = Checker.isHit(point.getX(), point.getY(), point.getR()); 
        point.setIsHit(isHit);
        point.setCreatedAt(new Date());
        long endTime = System.nanoTime();
        point.setExecutionTime(endTime - startTime);
        if (shouldUpdateAllPoints(point.getR())) {
            databaseService.updateAllPoints(point.getR());
            resultBean.updatePoints(point.getR());
        }
        databaseService.addPoint(point);
        resultBean.addResult(point);
    }

    private boolean shouldUpdateAllPoints(float radius) {
        return !resultBean.getResults().isEmpty() && resultBean.getResults().get(0).getR() != radius;
    }    
}